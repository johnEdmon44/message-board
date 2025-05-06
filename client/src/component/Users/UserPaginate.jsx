import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import UserList from "./UserList";

function UserPaginate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const userPerPage = 25;
  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3400/user/users`, {
          params: {
            page: currentPage,
            limit: userPerPage
          }
        });
        setUsers(response.data.usernames);
        setPageCount(response.data.totalPages);
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchApi();
  }, [currentPage]);


  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage });
  }

  return (
    <section className={`flex justify-center items-center min-h-screen bg-gray-100 ${loading ? "opacity-50" : "opacity-100"}`}>
      <div className="bg-white p-8 rounded-lg shadow-md  space-y-6">
        <UserList
          currentUsers={users}
          totalUsers={totalUsers} 
        />
        <ReactPaginate
          forcePage={currentPage - 1}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="flex justify-center gap-4 items-center mt-4 cursor-pointe "
          pageLinkClassName=" px-3 py-1 cursor-pointer"
          pageClassName=" rounded hover:bg-blue-100 px-3 py-1"
          activeClassName="bg-blue-500 text-white hover:bg-blue-600  "
          previousClassName="font-bold rounded hover:bg-blue-100 cursor-pointer"
          nextClassName="font-bold rounded hover:bg-blue-100 cursor-pointer"
          disabledClassName="text-gray-400 cursor-not-allowed"
          nextLinkClassName="px-3 py-1"
          previousLinkClassName="px-3 py-1"
        />
      </div>
    </section>
  )
}


export default UserPaginate;