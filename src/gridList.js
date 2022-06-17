import * as React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useCreatePath, NumberField, useListContext, RecordContextProvider } from 'react-admin';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, CardContent, CardActions, CardHeader } from '@mui/material';
import { isValidElement, ReactNode, ReactElement } from 'react';

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

    const { data, isLoading, total } = useListContext();

    if (isLoading === true) {
        return <LinearProgress />;
    }

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

