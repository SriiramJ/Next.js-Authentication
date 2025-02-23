export default function UserProfile({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">ProfilePage 
        
        <span className="text-xl  bg-orange-500  text-black rounded-md p-2"> {params.id}</span>
      </p>
    </div>
  );
}
