async function emailVerification() {
    const email = document.getElementById("vemail").value;
    console.log(email);

    try {
        const res = await fetch("http://localhost:3000/api/verifyemail", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Fixed typo here
            body: JSON.stringify({ email })
        });

        console.log(res);

        if (res.status === 200) {
            const {msg}=await res.json()
            alert(msg)
            window.location.href="http://localhost:3000/pages/login.html"
        } else {
            // Awaiting the JSON response before trying to access its data
            const { error } = await res.json();
            console.log(error);
        }
    } catch (error) {
        // Catching any network or other errors
        console.error("Error during email verification:", error);
    }
}
