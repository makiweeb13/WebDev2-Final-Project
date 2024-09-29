import { useAuth } from "../../util/ProtectedRoutes";
import UserHeader from "./UserHeader";
import Header from "../Header";

function HeaderMode() {
    if (useAuth()) {
        return <UserHeader />
    } else {
        return <Header />
    }
}

export default HeaderMode;