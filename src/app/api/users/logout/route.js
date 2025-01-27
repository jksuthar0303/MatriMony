export async function DELETE(req) {
  try {
    const cookieOptions = {
      httpOnly: true,
      maxAge: 0, 
      path: '/',
    };

    return new Response(
      JSON.stringify({ message: 'Logout successful' }), 
      {
        status: 200,
        headers: {
          'Set-Cookie': `authToken=; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Error logging out user', error: error.message }),
      { status: 500 }
    );
  }
}