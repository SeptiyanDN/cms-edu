import { useState, useRef, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { fetchCategories } from "@/store/reducers/category/categories";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "@/store";
import { AnyAction } from "redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const FormCollapse = () => {


  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { data: categories} = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);



  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    main_image: "",
    body: "",
  });
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          main_image: reader.result as string,
        }));
      };
    }
  };

  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        main_image: formData.main_image.split(",")[1],
        body: content,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_PUBLIC_URL}`, // ganti dengan domain Anda
          },
        },
      );
      const { data } = response.data;
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-w-full ">
      <button
        className="bg-primary text-white px-2 py-1 rounded color mb-4 "
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Cancel" : "Create New Article"}
      </button>
      <div
        className={`${
          isCollapsed ? "" : "hidden"
        } bg-white shadow-md rounded-2xl md:px-8 px-2 `}
      >
          <form onSubmit={handleSubmit} className="">

       <label
                className="block text-gray-700 font-bold mb-2 pt-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
               <label
                className="block text-gray-700 font-bold mb-2 pt-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
              ></textarea>
               <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category_id"
              >
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleFormChange}
                required
              >
                <option value="">-- Choose a category --</option>
                {categories.map((category)=> (
                  <option key={category.category_id} value={category.category_id}>{category.tag}</option>
                  ))}
                
              </select>
              <label
                className="block text-gray-700 font-bold mb-2 pt-2"
                htmlFor="main_image"
              >
                Main Image
              </label>
              <input
                type="file"
                name="main_image"
                id="main_image"
                onChange={handleImageChange}
              />
              <label
                className="block text-gray-700 font-bold mb-2 pt-2"
                htmlFor="body"
              >
                Body
              </label>
              <JoditEditor
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            
            <div className="flex items-center justify-between pb-4 pt-2">
              <button
                className=" ml-auto bg-primary  text-white font-mono text-xs py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default FormCollapse;


