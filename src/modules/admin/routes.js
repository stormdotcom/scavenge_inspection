import CreateUser from "./components/CreateUser";

const routes = [
    {
        title: "user_management",
        children: [
            {
                title: "create User",
                path: "create-user",
                element: <CreateUser />
            }
        ]
    }
];

export { routes };
