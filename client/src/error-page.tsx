import {useRouteError} from "react-router-dom";
import {Box, Typography} from "@mui/material";

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <div id="error-page">
            <Box sx={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography component={"h1"} variant={"h1"}>
                    Whoops!
                </Typography>
                <Typography component={"p"}>
                    Something went wrong :(
                </Typography>
                <span style={{height: 16}}/>
                <Typography component={"p"}>
                    <i>{error.message || error.statusText}</i>
                </Typography>
            </Box>
        </div>
    )
}
