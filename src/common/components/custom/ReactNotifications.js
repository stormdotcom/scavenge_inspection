import { useDispatch, useSelector } from "react-redux";
import NotificationsSystem, { atalhoTheme, dismissNotification } from "reapop";

const ReactNotifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications);

    return (
        <div>
            <NotificationsSystem
                notifications={notifications}
                dismissNotification={(id) => dispatch(dismissNotification(id))}
                theme={atalhoTheme}
            />
        </div>
    );
};

export default ReactNotifications;

