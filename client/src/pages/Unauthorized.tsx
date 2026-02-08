export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>🔒 Login required</h1>
      <p>
        You can use the trash sorter without an account,  
        but you need to log in to save your progress.
      </p>

      <a href="/auth">
        <button>Log in / Sign up</button>
      </a>

      <p style={{ marginTop: "1rem", opacity: 0.7 }}>
        Or continue sorting as a guest
      </p>

      <a href="/">
        <button>Continue as guest</button>
      </a>
    </div>
  );
}


