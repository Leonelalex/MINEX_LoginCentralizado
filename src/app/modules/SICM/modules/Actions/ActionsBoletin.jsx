/* eslint no-restricted-imports: ["error"] */
import React, { useState } from "react";
import { CardHeader, Grid, IconButton, CardContent, Tooltip } from "@material-ui/core";
import { Card } from "../../../../../_metronic/_partials/controls/Card";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Avistamiento, Situacion } from './';
import { PreviewBulletin } from "../../components";
import { getRouteImgs } from '../../../../../helpers/SICM';

function ActionsBoletin({ formData, boletin, closeMenu, open }) {
    const actions = [
        { name: "Cambio de situación", code: "SIT", component: Situacion },
        { name: "Avistamiento", code: "AVS", component: Avistamiento },
    ];
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const [currentAction, setCurrentAction] = useState(actions[0]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (index) => {
        setCurrentAction(actions[index]);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={closeMenu}
            fullWidth={true}
            maxWidth="md"
        >
            <DialogContent>
                <Card>
                    <CardHeader
                        action={<>
                        <Tooltip title="Acciones">
                            <IconButton aria-label="settings" onClick={handleMenu}>
                                <MoreVertIcon />
                            </IconButton>
                            </Tooltip>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                open={isOpen}
                                onClose={handleClose}
                            >
                                {actions.map((action, index) => <MenuItem key={action.code} onClick={(e) => { handleAction(index) }}>{action.name}</MenuItem>)}
                            </Menu>
                        </>
                        }
                        title="Seguimiento de Boletín Alba-Keneth"
                    />
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <PreviewBulletin boletin={boletin} formData={formData} alert={1} />
                                {
                                    boletin.boletin &&
                                    <a href={getRouteImgs(1, boletin.boletin)} rel="noreferrer">
                                        Ver boletín
                                    </a>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {currentAction && <currentAction.component codigo={boletin.codigoBoletin} closeMenu={closeMenu} alert={1} boletin={boletin}/>}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={closeMenu}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export { ActionsBoletin };
