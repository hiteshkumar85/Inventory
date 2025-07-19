import './Categories.css'
import axios from '../../api/axiosInstance';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Categories = () => {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const [button, setButton] = useState("Add Category");
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState();
    async function onSubmit(data) {
        setLoading(true);
        if (button == 'Add Category') {
            addCategoryForm(data);
        }
        else if (button == 'Update Category') {
            await axios.put(`/api/category/${id}`, data)
                .then(() => {
                    setCategories(categories.filter(category => category._id !== id));
                    toast.info("Category updated successfully!");
                    setButton('Add Category');
                    fetchCategories();
                })
                .catch((err) => {
                    if (err.response?.status === 409) {
                        toast.error("Category already exists!");
                    } else if (err.response?.status === 400) {
                        toast.error("Invalid category!");
                    } else {
                        toast.error("Something went wrong!");
                    }
                });
        }

        reset();
        setLoading(false);
    }

    // view all category 
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/category');
            setCategories(res.data);
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    // added new category 
    const addCategoryForm = async (data) => {
        try {
            await axios.post('/api/category', data);
            toast.success("Category added successfully!");
            fetchCategories();
        } catch (err) {
            if (err.response?.status === 409) {
                toast.error("Category already exists!");
            } else if (err.response?.status === 400) {
                toast.error("Invalid category!");
            } else {
                toast.error("Something went wrong!");
            }
        }

    }

    // delete category 
    const deleteCategory = async (id) => {
        await axios.delete(`/api/category/${id}`)
            .then(() => {
                setCategories(categories.filter(category => category._id !== id));
                toast.warn("Category deleted successfully!");
                fetchCategories();
            })
            .catch((err) => {
                toast.error("Something went wrong!");
            })
    }

    // update category
    const updateCategory = (category, id) => {
        setValue("category", category);
        setButton("Update Category");
        setId(id)
    }

    return (
        <section id='categoriesContainer'>
            <div className="categories">
                <h1>ALL CATEGORIES</h1>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.category}</td>
                                <td>
                                    <button onClick={() => updateCategory(category.category, category._id)}>
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button onClick={() => deleteCategory(category._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="add_categories">
                <h1>ADD NEW CATEGORIES</h1>
                <hr />
                <form id='addCategory' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text" placeholder='Category Name'
                        {...register("category", {
                            required: { value: true, message: "requied" }
                        })}
                    />
                    {errors.category && <span className='errorMsg'>{errors.category.message}</span>}

                    <button disabled={loading}>{loading ? 'Please wait...' : button}</button>
                </form>
            </div>
        </section>
    )
}

export default Categories
