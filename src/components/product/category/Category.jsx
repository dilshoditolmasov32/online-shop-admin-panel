import { useCallback, useEffect, useMemo, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Image from "../../upload/Image";
import Input from "../../input/Input";
import Modal from "../../modal/Modal";
import "../Product.css";
import Skeleton from "../../skeleton/Skeleton";
import { useCategories } from "../../../hooks/useCategories";
import { Slide, toast } from "react-toastify";

const toastConfig = {
  position: "bottom-right",
  autoClose: 909,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  transition: Slide,
  style: {
    width: "100%",
    borderRadius: "30px",
    fontFamily: "Neometric",
    fontSize: "14px",
  },
};

const getCategoryText = (category) =>
  category?.description ?? category?.name ?? "";

const Category = () => {
  const {
    categories,
    loading,
    massUpdateCategories,
    massDestroyCategories,
  } = useCategories({ sort: "id" });
  const [checkedItems, setCheckedItems] = useState({});
  const [draftValues, setDraftValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [destroying, setDestroying] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const categoriesById = useMemo(
    () =>
      Object.fromEntries(
        (categories || []).map((category) => [String(category.id), category]),
      ),
    [categories],
  );

  useEffect(() => {
    const validIds = new Set(
      (categories || []).map((category) => String(category.id)),
    );

    setCheckedItems((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(
          ([id, isChecked]) => validIds.has(id) && isChecked,
        ),
      ),
    );

    setDraftValues((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([id]) => validIds.has(id)),
      ),
    );
  }, [categories]);

  const selectedIds = useMemo(
    () =>
      Object.keys(checkedItems).filter(
        (id) => checkedItems[id] && categoriesById[id],
      ),
    [categoriesById, checkedItems],
  );

  const changedIds = useMemo(() => {
    const nextChangedIds = new Set();

    Object.entries(draftValues).forEach(([id, value]) => {
      const category = categoriesById[id];

      if (!category) {
        return;
      }

      if (value !== getCategoryText(category)) {
        nextChangedIds.add(id);
      }
    });

    return nextChangedIds;
  }, [categoriesById, draftValues]);

  const pendingUpdates = useMemo(
    () =>
      selectedIds
        .filter((id) => changedIds.has(id))
        .map((id) => ({
          id: Number(id),
          description: draftValues[id],
        })),
    [changedIds, draftValues, selectedIds],
  );

  const allCategoryIds = useMemo(
    () => (categories || []).map((category) => String(category.id)),
    [categories],
  );

  const isAllSelected =
    allCategoryIds.length > 0 &&
    allCategoryIds.every((id) => checkedItems[id]);

  const handleToggleItem = useCallback((id) => {
    const categoryId = String(id);

    setCheckedItems((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  }, []);

  const handleToggleAll = useCallback(() => {
    const shouldSelectAll = !isAllSelected;

    setCheckedItems(
      Object.fromEntries(allCategoryIds.map((id) => [id, shouldSelectAll])),
    );
  }, [allCategoryIds, isAllSelected]);

  const handleQueueUpdate = useCallback((id, nextValue) => {
    const categoryId = String(id);

    setDraftValues((prev) => ({
      ...prev,
      [categoryId]: nextValue,
    }));

    setCheckedItems((prev) => ({
      ...prev,
      [categoryId]: true,
    }));
  }, []);

  const handleMassUpdate = useCallback(async () => {
    if (!pendingUpdates.length) {
      toast.info("Saqlash uchun tanlangan o'zgarish topilmadi", toastConfig);
      return;
    }

    try {
      setSaving(true);
      await massUpdateCategories(pendingUpdates);

      setDraftValues((prev) =>
        Object.fromEntries(
          Object.entries(prev).filter(([id]) => !selectedIds.includes(id)),
        ),
      );

      toast.success(
        `${pendingUpdates.length} ta kategoriya muvaffaqiyatli yangilandi`,
        toastConfig,
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Kategoriyalarni ommaviy yangilab bo'lmadi",
        toastConfig,
      );
    } finally {
      setSaving(false);
    }
  }, [massUpdateCategories, pendingUpdates, selectedIds]);

  const handleOpenDeleteModal = useCallback(() => {
    if (!selectedIds.length) {
      toast.info("O'chirish uchun kamida bitta kategoriya tanlang", toastConfig);
      return;
    }

    setIsDeleteModalOpen(true);
  }, [selectedIds]);

  const handleMassDestroy = useCallback(async () => {
    try {
      setDestroying(true);
      await massDestroyCategories(selectedIds);
      setIsDeleteModalOpen(false);
      setCheckedItems({});
      setDraftValues((prev) =>
        Object.fromEntries(
          Object.entries(prev).filter(([id]) => !selectedIds.includes(id)),
        ),
      );

      toast.success(
        `${selectedIds.length} ta kategoriya muvaffaqiyatli o'chirildi`,
        toastConfig,
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Kategoriyalarni ommaviy o'chirib bo'lmadi",
        toastConfig,
      );
    } finally {
      setDestroying(false);
    }
  }, [massDestroyCategories, selectedIds]);

  return (
    <div className="category-page">
      {loading ? (
        <Skeleton count={4} />
      ) : (
        <>
          <div className="category-actions">
            <label className="category-select-all">
              <Checkbox
                checked={isAllSelected}
                indeterminate={selectedIds.length > 0 && !isAllSelected}
                onChange={handleToggleAll}
              />
              <span>
                Tanlanganlar: {selectedIds.length} / {allCategoryIds.length}
              </span>
            </label>

            <div className="category-action-buttons">
              <button
                type="button"
                className="category-action-btn"
                onClick={handleMassUpdate}
                disabled={!pendingUpdates.length || saving || destroying}
              >
                {saving
                  ? "Saqlanmoqda..."
                  : `Mass update (${pendingUpdates.length})`}
              </button>
              <button
                type="button"
                className="category-action-btn category-action-btn-danger"
                onClick={handleOpenDeleteModal}
                disabled={!selectedIds.length || saving || destroying}
              >
                {destroying
                  ? "O'chirilmoqda..."
                  : `Mass destroy (${selectedIds.length})`}
              </button>
            </div>
          </div>

          {categories?.length ? (
            <ul>
              {categories.map((value, index) => (
                <li key={value.id} className="category-list">
                  <div className="category-select">
                    <Checkbox
                      checked={!!checkedItems[value.id]}
                      onChange={() => handleToggleItem(value.id)}
                    />
                  </div>

                  <Image numbers={index} />

                  <div className="input-container">
                    <Input
                      title="Glavniy tekst"
                      text={
                        draftValues[String(value.id)] ?? getCategoryText(value)
                      }
                      initialValue={getCategoryText(value)}
                      editData="Gotovo"
                      showSuccessToast={false}
                      onSave={(newValue) => handleQueueUpdate(value.id, newValue)}
                    />
                    <Input
                      title="Podtekst"
                      text={value.name || value.description || ""}
                      readOnly
                      showEditButton={false}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="category-empty">Kategoriyalar topilmadi</p>
          )}
        </>
      )}

      <Modal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        titleText={`${selectedIds.length} ta kategoriyani o'chirmoqchimisiz?`}
        confirmText="O'chirish"
        cancelText="Bekor qilish"
        onConfirm={handleMassDestroy}
      />
    </div>
  );
};

export default Category;
