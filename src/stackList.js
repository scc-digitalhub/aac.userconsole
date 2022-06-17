import {
    sanitizeListRestProps,
    useListContext,
    useResourceContext,
    RaRecord,
    RecordContextProvider,
    ComponentPropType,
    useCreatePath,
} from 'react-admin';

import { Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export const StackList = (props) => {
    const { className, children, linkType = 'edit', ...rest } = props;
    const { data, isLoading } = useListContext(props);

    if (isLoading === true) {
        return <LinearProgress />;
    }

    return (
        <Stack spacing={2} sx={{ padding: 2 }}>
            {data.map((record, rowIndex) => {

                return (
                    <RecordContextProvider
                        value={record}
                        key={record.id ?? `row${rowIndex}`}
                    >
                        {children}
                    </RecordContextProvider>
                );
            })}
        </Stack>
    );

    // return (
    //     <Component className={className} {...sanitizeListRestProps(rest)}>
    //         {data.map((record, rowIndex) => {

    //             return (
    //                 <RecordContextProvider
    //                     value={record}
    //                     key={record.id ?? `row${rowIndex}`}
    //                 >
    //                     {children}
    //                 </RecordContextProvider>
    //             );
    //         })}
    //     </Component>
    // );
};


