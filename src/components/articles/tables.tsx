import React, { useEffect, useState } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store/index';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchArticles } from '@/store/reducers/articles/articlesSlice';
import { BiCommentEdit } from 'react-icons/bi'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { FaRegEye } from 'react-icons/fa'


export default function Tables() {
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { data: articles} = useSelector((state: RootState) => state.articles);
  const [limit, setLimit] = useState(3);
  const [search, setSearch] = useState(" ");
  const [sort, setSort] = useState(" ");
  const [loading, setLoading] = useState(false);
  interface IScrollEvent extends React.UIEvent<HTMLDivElement> {
    target: HTMLDivElement;
  }
  
  useEffect(() => {
    console.log(search)
    dispatch(fetchArticles({ search, limit,sort }));
  }, [dispatch, limit, search,sort]);

  useEffect(() => {
    setLoading(false);
  }, [articles]);


  return (
    <>
    <div className="mb-5 mt-4 text-lg">Tables</div>
    <div
      className="relative overflow-x-auto"
      style={{ maxHeight: '500px' }}
    >
      <table className="table table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Tag</th>
            <th className="px-4 py-2">Author</th>
            <th className='px-4 py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.article_id}>
              <td className="border px-4 py-2">{article.category_name}</td>
              <td className="border px-4 py-2">{article.title}</td>
              <td className="border px-4 py-2">{article.description}</td>
              <td className="border px-4 py-2">{article.tag}</td>
              <td className="border px-4 py-2">{article.author_name}</td>
              <td className="border px-4 py-2">
                <div className="flex">
                    <button>
                <BiCommentEdit size={20} className='m-1'/>
                    </button>
                    <button>
                <RiDeleteBin5Fill size={20} className='m-1'/>
                    </button>
                    <button>
                <FaRegEye size={20} className='m-1'/>

                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="text-center">Loading...</div>}
    </div>
  </>
  )
}
