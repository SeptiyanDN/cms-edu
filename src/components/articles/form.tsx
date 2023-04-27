import { useState,useRef } from "react";
import axios from "axios";
import HTMLReactParser from 'html-react-parser'
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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


  const editor = useRef(null);
	const [content, setContent] = useState('');
	

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        main_image: formData.main_image.split(',')[1],
        body:content,
      };
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiQXNoOTJ0TzhRN0ZZTTFlNmVNbWNob25PNmVhcW1kN2hPdkZGOFpnUmZVNjdYU2kwN255bXFVV3p3QVgtQzRSb0o5U0NSUT09IiwidXNlcm5hbWUiOiJTZXB0aXlhbkROIiwiZXhwIjoxNjgyNTgxNzUwfQ.YhYbTixH6tl937_gmzjcP_5Jd8dFaOeKT1bDmUHl3xw'
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/`,
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
    <div className="w-full mx-auto">
      <button
        className="bg-primary text-white px-2 py-1 rounded color mb-4"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Cancel" : "Create New Article"}
      </button>
      <div
        className={`${
          isCollapsed ? "block" : "hidden"
        } bg-white shadow-md rounded-2xl px-8 pt-4 pb-8 mb-4`}
      >
  <form onSubmit={handleSubmit} className="">
  <div className="mb-4">
    <label
      className="block text-gray-700 font-bold mb-2"
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
  </div>
  <div className="mb-4">
    <label
      className="block text-gray-700 font-bold mb-2"
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
  </div>
  <div className="mb-4">
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
  </div>
  <div className="mb-4">
    <label
      className="block text-gray-700 font-bold mb-2"
      htmlFor="main_image"
    >
      Main Image
    </label>
    <input type="file" name="main_image" id="main_image" onChange={handleImageChange} />

  </div>
  <div className="mb-4">
    <label
      className="block text-gray-700 font-bold mb-2"
      htmlFor="body"
    >
      Body
    </label>
    <JoditEditor
      value={content}
			onChange={newContent => setContent(newContent)}
		/>
  
  </div>
  <div className="">
    {HTMLReactParser(content)}
  </div>
  
  
  <div className="flex items-center justify-between">
    <button
      className=" ml-auto bg-primary  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
