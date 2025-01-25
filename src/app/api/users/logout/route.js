export async function POST() {
    return new Response(
      JSON.stringify({ message: "Logged out successfully" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": "authToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
          "Content-Type": "application/json",
        },
      }
    );
  }
  