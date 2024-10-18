import useAuth from "../../util/useAuth";
import UserHeader from "./UserHeader";
import Header from "../Header";

function HeaderMode() {
    const { isAuthenticated, loading } = useAuth();

    if (!loading) {
        if (isAuthenticated) {
            return <UserHeader />
        } else {
            return <Header />
        }
    }
    
}

export default HeaderMode;