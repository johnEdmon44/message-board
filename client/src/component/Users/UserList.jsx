import ReactPaginate from "react-paginate";


function UserList({ currentUsers, totalUsers }) {
  return (
    <>
      <h1 className="font-bold">Users: {totalUsers}</h1>
      <ul className="grid grid-cols-5 grid-rows-5 gap-5">
        {currentUsers.map(user => (
          <li key={user.id} className="border border-gray-300 px-5 py-2 w-48 shadow-md rounded-sm">{user.username}</li>
        ))}
      </ul>
    </>
  )
}


export default UserList;