import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";
import { toastConfig } from "../../utils/toast";
import CheckBox from "../checkbox/CheckBox";
import ImageUploader from "../upload/imageAdd/ImageUploader";
import "./EditProduct.css";
import Calendar from "../calendar/Calendar";
import { Box, Skeleton } from "@mui/material";


const defaultForm = {
  channel: "default",
  sku: "",
  name: "",
  url_key: "",
  short_description: "",
  description: "",
  price: "",
  inventory_quantity: "",
  status: true,
  visible_individually: true,
  categoryIds: [],
};

const requiredFields = {
  sku: "SKU majburiy",
  name: "Mahsulot nomi majburiy",
  url_key: "URL key majburiy",
  short_description: "Qisqa tavsif majburiy",
  description: "To'liq tavsif majburiy",
};

const slugify = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const pickValue = (...values) =>
  values.find((value) => value !== undefined && value !== null) ?? "";

const pickIdValue = (value) => {
  if (value && typeof value === "object") {
    return pickValue(value?.id, value?.value, "");
  }

  return pickValue(value, "");
};

const normalizeBoolean = (value, fallback = false) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    return value === "1" || value.toLowerCase() === "true";
  }

  return fallback;
};

const normalizeImageItems = (images = []) =>
  images
    .map((image, index) => {
      if (typeof image === "string") {
        return {
          id: `existing-${index}`,
          preview: image,
          isExisting: true,
        };
      }

      const preview = pickValue(
        image?.url,
        image?.path,
        image?.image_url,
        image?.original_image_url,
        image?.medium_image_url,
        image?.small_image_url,
      );

      if (!preview) {
        return null;
      }

      return {
        id: `existing-${image?.id ?? index}`,
        preview,
        isExisting: true,
      };
    })
    .filter(Boolean);

const normalizeCategoryIds = (categories) => {
  if (typeof categories === "string") {
    return categories
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => Number.isFinite(id));
  }

  if (!Array.isArray(categories)) {
    return [];
  }

  return categories
    .map((category) => (typeof category === "object" ? category?.id : category))
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id));
};

const normalizeProductForm = (product) => ({
  channel: pickValue(product?.channel, product?.channel_code, "default"),
  sku: pickValue(product?.sku),
  product_number: pickValue(product?.product_number),
  name: pickValue(product?.name),
  url_key: pickValue(product?.url_key, product?.slug),
  tax_category_id: pickIdValue(product?.tax_category_id),
  color: pickIdValue(product?.color),
  size: pickIdValue(product?.size),
  brand: pickIdValue(product?.brand),
  short_description: pickValue(product?.short_description),
  description: pickValue(product?.description),
  meta_title: pickValue(product?.meta_title),
  meta_description: pickValue(product?.meta_description),
  meta_keywords: pickValue(product?.meta_keywords),
  price: pickValue(product?.price),
  cost: pickValue(product?.cost),
  special_price: pickValue(product?.special_price),
  special_price_from: pickValue(product?.special_price_from),
  special_price_to: pickValue(product?.special_price_to),
  length: pickValue(product?.length),
  width: pickValue(product?.width),
  height: pickValue(product?.height),
  weight: pickValue(product?.weight),
  inventory_quantity: pickValue(
    product?.inventories?.[0]?.qty,
    product?.inventories?.[0],
    product?.inventory_quantity,
  ),
  new: normalizeBoolean(product?.new),
  featured: normalizeBoolean(product?.featured),
  manage_stock: normalizeBoolean(product?.manage_stock),
  visible_individually: normalizeBoolean(product?.visible_individually, true),
  guest_checkout: normalizeBoolean(product?.guest_checkout),
  status: normalizeBoolean(product?.status, true),
  categoryIds: normalizeCategoryIds(
    product?.categories || product?.category_ids,
  ),
});

const buildCategoryOptions = (categories = []) =>
  categories
    .flatMap((category) => {
      if (
        Array.isArray(category?.subcategories) &&
        category.subcategories.length
      ) {
        return category.subcategories.map((subcategory) => ({
          id: Number(subcategory.id),
          title: subcategory.name || subcategory.title || `#${subcategory.id}`,
          group: category.name || category.title || "",
        }));
      }

      return [
        {
          id: Number(category.id),
          title: category.name || category.title || `#${category.id}`,
          group: "",
        },
      ];
    })
    .filter((category) => Number.isFinite(category.id));

const EditField = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  textarea = false,
  placeholder,
  step,
}) => {
  const baseClass = error ? "edit-field-error-input" : "edit-field-input";

  return (
    <div className="edit-field">
      <label htmlFor={name} className="edit-field-label">
        {label} {required && <span>*</span>}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `${label} kiriting...`}
          className={`${baseClass} edit-field-textarea`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `${label} kiriting...`}
          step={step}
          className={baseClass}
        />
      )}

      {error && <p className="edit-field-error">{error}</p>}
    </div>
  );
};

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { getProduct, updateProduct } = useProducts({}, false);
  const { categories } = useCategories({ sort: "id" });
  const productListPath = "/dashboard/warehouse/products-list";
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageItems, setImageItems] = useState([]);
  const [urlKeyTouched, setUrlKeyTouched] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const imageItemsRef = useRef([]);

  const categoryOptions = useMemo(
    () => buildCategoryOptions(categories),
    [categories],
  );

  const applyProduct = useCallback((product) => {
    imageItemsRef.current.forEach((item) => {
      if (item?.isNew && item?.preview) {
        URL.revokeObjectURL(item.preview);
      }
    });

    setForm(normalizeProductForm(product));
    setImageItems(normalizeImageItems(product?.images));
    setUrlKeyTouched(Boolean(pickValue(product?.url_key, product?.slug)));
  }, []);

  useEffect(() => {
    imageItemsRef.current = imageItems;
  }, [imageItems]);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(productId);

        if (!cancelled) {
          applyProduct(response);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Mahsulotni yuklab bo'lmadi",
            toastConfig,
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [applyProduct, getProduct, productId]);

  useEffect(() => {
    return () => {
      imageItemsRef.current.forEach((item) => {
        if (item?.isNew && item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, []);

  const handleFieldChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setForm((prev) => {
        const nextForm = {
          ...prev,
          [name]: value,
        };

        if (name === "name" && !urlKeyTouched) {
          nextForm.url_key = slugify(value);
        }

        return nextForm;
      });

      if (name === "url_key") {
        setUrlKeyTouched(true);
      }

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    },
    [urlKeyTouched],
  );

  const handleToggleStatus = useCallback((name) => {
    setForm((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  const handleToggleCategory = useCallback((categoryId) => {
    setForm((prev) => {
      const hasCategory = prev.categoryIds.includes(categoryId);

      return {
        ...prev,
        categoryIds: hasCategory
          ? prev.categoryIds.filter((id) => id !== categoryId)
          : [...prev.categoryIds, categoryId],
      };
    });
  }, []);

  const handleAddFiles = useCallback((files) => {
    setImageItems((prev) => {
      const currentCount = prev.length;
      const nextItems = files
        .slice(0, Math.max(0, 5 - currentCount))
        .map((file, index) => ({
          id: `new-${file.name}-${file.size}-${Date.now()}-${index}`,
          file,
          preview: URL.createObjectURL(file),
          isNew: true,
        }));

      return [...prev, ...nextItems];
    });
  }, []);

  const handleRemoveImage = useCallback((itemId) => {
    setImageItems((prev) =>
      prev.filter((item) => {
        if (item.id === itemId && item.isNew && item.preview) {
          URL.revokeObjectURL(item.preview);
        }

        return item.id !== itemId;
      }),
    );
  }, []);

  const validateForm = useCallback(() => {
    const nextErrors = {};

    Object.entries(requiredFields).forEach(([fieldName, message]) => {
      if (!String(form[fieldName] ?? "").trim()) {
        nextErrors[fieldName] = message;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const buildFormData = useCallback(() => {
    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("channel", form.channel || "default");
    formData.append("sku", form.sku.trim());
    formData.append("name", form.name.trim());
    formData.append("url_key", form.url_key.trim());
    formData.append("short_description", form.short_description.trim());
    formData.append("description", form.description.trim());

    [
      "product_number",
      "tax_category_id",
      "color",
      "size",
      "brand",
      "meta_title",
      "meta_description",
      "meta_keywords",
      "price",
      "cost",
      "special_price",
      "special_price_from",
      "special_price_to",
      "length",
      "width",
      "height",
      "weight",
    ].forEach((fieldName) => {
      const value = String(form[fieldName] ?? "").trim();

      if (value) {
        formData.append(fieldName, value);
      }
    });

    [
      "new",
      "featured",
      "manage_stock",
      "visible_individually",
      "guest_checkout",
      "status",
    ].forEach((fieldName) => {
      formData.append(fieldName, form[fieldName] ? "1" : "0");
    });

    form.categoryIds.forEach((categoryId) => {
      formData.append("categories[]", String(categoryId));
    });

    if (String(form.inventory_quantity).trim()) {
      formData.append("inventories[]", String(form.inventory_quantity).trim());
    }

    imageItems
      .filter((item) => item.isNew && item.file)
      .forEach((item, index) => {
        formData.append("images[files][]", item.file);
        formData.append("images[position][]", String(index + 1));
      });

    return formData;
  }, [form, imageItems]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!productId) {
        toast.error("Mahsulot ID topilmadi", toastConfig);
        return;
      }

      if (!validateForm()) {
        toast.error("Majburiy maydonlarni to'ldiring", toastConfig);
        return;
      }

      try {
        setSaving(true);
        await updateProduct(productId, buildFormData());
        toast.success("Mahsulot muvaffaqiyatli yangilandi", toastConfig);
        navigate(productListPath);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Mahsulotni yangilab bo'lmadi",
          toastConfig,
        );
      } finally {
        setSaving(false);
      }
    },
    [
      buildFormData,
      navigate,
      productId,
      productListPath,
      updateProduct,
      validateForm,
    ],
  );

  if (!productId) {
    return (
      <div className="edit-product-empty">
        Tahrirlash uchun mahsulot tanlanmagan.
      </div>
    );
  }

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        {[...Array(12)].map((_, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Skeleton height={30} width="100%" />
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="100%" />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <form className="editProduct-page" onSubmit={handleSubmit}>
      <h2 className="edit-product-heading">Mahsulotni tahrirlash</h2>

      <ImageUploader
        items={imageItems}
        onAddFiles={handleAddFiles}
        onRemoveItem={handleRemoveImage}
      />

      <div className="editProduct-section">
        <div className="product-title">Asosiy ma'lumotlar</div>
        <div className="editProduct-grid two-columns">
          <EditField
            label="Mahsulot nomi"
            name="name"
            value={form.name}
            onChange={handleFieldChange}
            error={errors.name}
            required
            placeholder="Masalan: iPhone 15 Pro Max"
          />
          <EditField
            label="SKU"
            name="sku"
            value={form.sku}
            onChange={handleFieldChange}
            error={errors.sku}
            required
            placeholder="Masalan: SKU-12345"
          />
          <EditField
            label="URL key"
            name="url_key"
            value={form.url_key}
            onChange={handleFieldChange}
            error={errors.url_key}
            required
            placeholder="iphone-15-pro"
          />
          <EditField
            label="Narx"
            name="price"
            value={form.price}
            onChange={handleFieldChange}
            type="number"
            step="0.01"
            placeholder="Masalan: 12000000"
          />
          <EditField
            label="Inventar soni"
            name="inventory_quantity"
            value={form.inventory_quantity}
            onChange={handleFieldChange}
            type="number"
            placeholder="Masalan: 25"
          />
        </div>
      </div>

      <div className="editProduct-section">
        <div className="product-title">Tavsif</div>
        <div className="editProduct-grid one-column">
          <EditField
            label="Qisqa tavsif"
            name="short_description"
            value={form.short_description}
            onChange={handleFieldChange}
            error={errors.short_description}
            required
            textarea
            placeholder="Mahsulot haqida qisqa ma'lumot yozing"
          />
          <EditField
            label="To'liq tavsif"
            name="description"
            value={form.description}
            onChange={handleFieldChange}
            error={errors.description}
            required
            textarea
            placeholder="Mahsulotning batafsil tavsifini yozing"
          />
        </div>
      </div>

      <div className="editProduct-section">
        <div className="product-title">Kategoriyalar</div>
        {categoryOptions.length ? (
          <div className="edit-category-grid">
            {categoryOptions.map((category) => (
              <CheckBox
                key={category.id}
                title={
                  category.group
                    ? `${category.group} / ${category.title}`
                    : category.title
                }
                checked={form.categoryIds.includes(category.id)}
                onChange={() => handleToggleCategory(category.id)}
              />
            ))}
          </div>
        ) : (
          <p className="edit-product-empty-inline">Kategoriyalar yuklanmadi.</p>
        )}
      </div>

      <div className="editProduct-section">
        <div className="product-title">Holati</div>
        <div className="product-checkbox edit-status-grid">
          <CheckBox
            title="Alohida ko'rinsin"
            checked={form.visible_individually}
            onChange={() => handleToggleStatus("visible_individually")}
          />
          <CheckBox
            title="Aktiv holat"
            checked={form.status}
            onChange={() => handleToggleStatus("status")}
          />
        </div>
      </div>

      <div className="edit-product-advanced-toggle">
        <button
          type="button"
          className="edit-product-advanced-button"
          onClick={() => setShowAdvanced((prev) => !prev)}
        >
          {showAdvanced
            ? "Qo'shimcha sozlamalarni yopish"
            : "Qo'shimcha sozlamalar"}
        </button>
      </div>

      {showAdvanced && (
        <div className="edit-product-advanced-panel">
          <div className="editProduct-section edit-product-advanced-section">
            <div className="product-title">Qo'shimcha ma'lumotlar</div>
            <div className="editProduct-grid two-columns">
              <EditField
                label="Channel"
                name="channel"
                value={form.channel}
                onChange={handleFieldChange}
                placeholder="Masalan: default"
              />
              <EditField
                label="Mahsulot raqami"
                name="product_number"
                value={form.product_number}
                onChange={handleFieldChange}
                placeholder="Masalan: 12000000"
              />
              <EditField
                label="Tax category ID"
                name="tax_category_id"
                value={form.tax_category_id}
                onChange={handleFieldChange}
                type="number"
                placeholder="Masalan: 1"
              />
              <EditField
                label="Brand ID"
                name="brand"
                value={form.brand}
                onChange={handleFieldChange}
                type="number"
                placeholder="Masalan: 12"
              />
              <EditField
                label="Color ID"
                name="color"
                value={form.color}
                onChange={handleFieldChange}
                type="number"
                placeholder="Masalan: 5"
              />
              <EditField
                label="Size ID"
                name="size"
                value={form.size}
                onChange={handleFieldChange}
                type="number"
                placeholder="Masalan: 42"
              />
            </div>
          </div>

          <div className="editProduct-section edit-product-advanced-section">
            <div className="product-title">SEO</div>
            <div className="editProduct-grid one-column">
              <div className="editProduct-grid two-columns">
                <EditField
                  label="Meta title"
                  name="meta_title"
                  value={form.meta_title}
                  onChange={handleFieldChange}
                  placeholder="Masalan: iPhone 15 Pro Max narxi"
                />
                <EditField
                  label="Meta keywords"
                  name="meta_keywords"
                  value={form.meta_keywords}
                  onChange={handleFieldChange}
                  placeholder="Masalan: iphone, apple, telefon"
                />
              </div>
              <EditField
                label="Meta description"
                name="meta_description"
                value={form.meta_description}
                onChange={handleFieldChange}
                textarea
                placeholder="Qidiruv tizimlari uchun qisqa tavsif"
              />
            </div>
          </div>

          <div className="editProduct-section edit-product-advanced-section">
            <div className="product-title">Narx va o'lchamlar</div>
            <div className="editProduct-grid two-columns">
              <EditField
                label="Tannarx"
                name="cost"
                value={form.cost}
                onChange={handleFieldChange}
                type="number"
                step="0.01"
                placeholder="Masalan: 10000000"
              />
              <EditField
                label="Chegirma narxi"
                name="special_price"
                value={form.special_price}
                onChange={handleFieldChange}
                type="number"
                step="0.01"
                placeholder="Masalan: 11500000"
              />
              <EditField
                label="Chegirma boshi"
                name="special_price_from"
                value={form.special_price_from}
                onChange={handleFieldChange}
                type="date"
              />
           
              <EditField
                label="Chegirma oxiri"
                name="special_price_to"
                value={form.special_price_to}
                onChange={handleFieldChange}
                type="date"
              />
              <EditField
                label="Uzunlik"
                name="length"
                value={form.length}
                onChange={handleFieldChange}
                type="number"
                step="0.01"
                placeholder="Masalan: 10"
              />
              <EditField
                label="Kenglik"
                name="width"
                value={form.width}
                onChange={handleFieldChange}
                type="number"
                step="0.01"
                placeholder="Masalan: 7"
              />
              <EditField
                label="Balandlik"
                name="height"
                value={form.height}
                onChange={handleFieldChange}
                type="number"
                step="0.01"
                placeholder="Masalan: 1"
              />
              <EditField
                label="Og'irlik"
                name="weight"
                value={form.weight}
                onChange={handleFieldChange}
                type="number"
                step="0.01"
                placeholder="Masalan: 0.5"
              />
            </div>
          </div>

          <div className="editProduct-section edit-product-advanced-section">
            <div className="product-title">Qo'shimcha holatlar</div>
            <div className="product-checkbox edit-status-grid">
              <CheckBox
                title="Yangi mahsulot"
                checked={form.new}
                onChange={() => handleToggleStatus("new")}
              />
              <CheckBox
                title="Mahsus taklif"
                checked={form.featured}
                onChange={() => handleToggleStatus("featured")}
              />
            
            </div>
          </div>
        </div>
      )}

      <div className="edit-product-actions-buttons">
        <div className="edit-product-action-buttons">
          <button
            type="button"
            className="edit-product-cancel"
            onClick={() => navigate(productListPath)}
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="edit-product-submit"
            disabled={saving}
          >
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProduct;
