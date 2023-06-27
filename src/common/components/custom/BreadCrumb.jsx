import { NavigateNext } from "@mui/icons-material";
import { Link, Breadcrumbs } from "@mui/material";
import { Stack } from "@mui/system";
import { routes } from "modules/routes";
import { useNavigate } from "react-router-dom";

import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumb = () => {
    const breadcrumbs = useBreadcrumbs(routes);
    const navigate = useNavigate();
    const handleClick = (path) => navigate(path);
    let breadcrumbsLength = breadcrumbs.length;
    return < Stack direction="row" spacing={1} sx={{ m: 2 }}>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            {breadcrumbs.map(({ match, breadcrumb }, index) => {
                const { route: { icon = null } = {}, pathname = "/", params } = match;
                let newpathName = pathname;
                if (pathname === "/") {
                    newpathName = "/Dashboard";
                }
                if (params.id) {
                    breadcrumbsLength = breadcrumbsLength - 1;
                }
                return <Link underline="none" size="small" icon={icon} key={pathname} onClick={() => {
                    breadcrumbsLength - 1 > index && handleClick(newpathName);
                }}
                    sx={{ cursor: "pointer", fontSize: "14px", color: "#393737" }}>{breadcrumb}</Link>;

            })}
        </Breadcrumbs>
    </Stack >;
};

export default Breadcrumb;
