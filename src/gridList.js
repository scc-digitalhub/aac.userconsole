import * as React from 'react';
import { Box, Grid} from '@mui/material';
import {useListContext, RecordContextProvider } from 'react-admin';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, CardContent, CardActions, CardHeader } from '@mui/material';
import { isValidElement} from 'react';

const style = {
    // Use flex layout with column direction for components in the card
    // (CardContent and CardActions)
    display: "flex",
    flexDirection: "column",

    // Justify the content so that CardContent will always be at the top of the card,
    // and CardActions will be at the bottom
    justifyContent: "space-between"

};

export const GridList = (props) => {
    const { className, cols = 6, linkType = 'edit' } = props;
    const { title, subtitle, icon, primaryText, secondaryText, actions } = props;
    //useListContext recupera i dati
    const { data, isLoading, total } = useListContext();
    //se siamo nello stato di isLoading allora vi e' la barra che carica
    if (isLoading === true) {
        return <LinearProgress />;
    }
    //se data vuoto, return null
    if (!data) return null;


    return (
        <Box>
            <Grid container spacing={2} >
                {data.map((record, rowIndex) => (
                    <RecordContextProvider key={record.id} value={record}>

                        <Grid item xs={12} md={cols} zeroMinWidth >
                            <Card sx={{ height: '100%' }}>
                                {!!title && (isValidElement(title)
                                    ? title
                                    : <CardHeader
                                        title={title(record, record.id)}
                                        subheader={subtitle ? subtitle(record, record.id) : false}
                                        avatar={icon ? (isValidElement(icon) ? icon : icon(record, record.id)) : false}
                                    >

                                    </CardHeader>)
                                }
                                <CardContent>
                                    {isValidElement(primaryText)
                                        ? primaryText
                                        : primaryText(record, record.id)}

                                </CardContent>
                                {actions && (
                                    <CardActions>
                                        {isValidElement(actions)
                                            ? actions
                                            : actions(record, record.id)}
                                    </CardActions>
                                )}
                            </Card>
                        </Grid>
                    </RecordContextProvider>

                ))}
            </Grid >
        </Box >
    );
};

export default GridList;

