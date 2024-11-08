import { Link, useRouteError } from "react-router-dom"

function ErrorPage() {
    const error = useRouteError();

    return (
        <main className="error error-page">
            <h3>Error</h3>
            <p>{error.message}</p>
            <Link to="/">Back to Homepage</Link>
        </main>
    )
}

export default ErrorPage;