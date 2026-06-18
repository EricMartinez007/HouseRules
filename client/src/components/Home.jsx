export default function Home({ loggedInUser }) {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h1>Welcome back, {loggedInUser?.userName}!</h1>
        <p className="lead text-muted">
          Use the navigation above to manage chores and user profiles.
        </p>
      </div>
    </div>
  );
}
