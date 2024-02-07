import {Grid, Hidden, Typography, Drawer, Box} from "@mui/material";

export default function ResponsiveDrawer(){
    const drawer = (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h6">Home</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Search</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Notifications</Typography>
                </Grid>
            </Grid>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={'bottom'}
                    open={true}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </Box>
    );
}