import { useEffect, useState } from "react";
import Image from "../../upload/Image";
import Input from "../../input/Input";
import { getCategoryList } from "../../../../service";
import "../Product.css";
import Skeleton from "../../skeleton/Skeleton";
const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const getData = await getCategoryList();
        setCategoryData(getData?.results || []);
      } catch (error) {
        console.error("Kategoriya olishda xato:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (newValue) => {
    try {
      // Masalan, API chaqiruv
      const res = await fetch("/api/update-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: newValue }),
      });
      if (!res.ok) throw new Error("Xatolik");
      alert("Ma'lumot saqlandi");
    } catch (err) {
      console.error(err);
      alert("Saqlashda xatolik");
    }
  };

  return (
    <>
      <div className="category-page">
        {loading ? (
          <Skeleton count={4} />
        ) : (
          <ul>
            {categoryData?.map((value, index) => (
              <li key={value.id} className="category-list">
                <Image numbers={index} />

                <div className="input-container">
                  <Input
                    title="Главный текст"
                    text={`${value.description}`}
                    initialValue={`${value.description}`}
                    onSave={handleSave}
                  />
                  <Input
                    title="Подтекст"
                    text={`${value.description}`}
                    editData={"Готово"}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Category;
