import { useState, useRef } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const FormCollapse = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    main_image: "",
    body: "",
  });

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
      const token = localStorage.getItem("token");
      console.log(token) // ambil token dari localStorage
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/articles`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-w-full ">
      <button
        className="bg-primary text-white px-2 py-1 rounded color mb-4 w-full"
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
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
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


