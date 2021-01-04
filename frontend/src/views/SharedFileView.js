import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { getSharedFile, downloadSharedFile } from '../actions/file';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    paper: {
        position: 'absolute',
        width: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const SharedFileView = ({ files, getSharedFile, downloadSharedFile }) => {
    const { fileId } = useParams();
    const classes = useStyles();

    useEffect(() => {
        getSharedFile(fileId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const downloadHandler = (id, filename) => {
        downloadSharedFile(id, filename);
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell align="center">File Size</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Date Uploaded</TableCell>
                        <TableCell align="center">Download</TableCell>
                    </TableRow>
                </TableHead>
                {
                    files && (
                        <TableBody>
                            {files.map((file) => (
                                <TableRow key={file._id}>
                                    <TableCell component="th" scope="row">
                                        {file.filename}
                                    </TableCell>
                                    <TableCell align="center">{`${Math.round(file.length / 1024)} Kb`}</TableCell>
                                    <TableCell align="center">{file.contentType}</TableCell>
                                    <TableCell align="center">{new Date(file.uploadDate).toLocaleString()}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="primary" onClick={() => {
                                            downloadHandler(file._id, file.filename)
                                        }}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )
                }
            </Table>
        </TableContainer>
    )
}

const mapStateToProps = (state) => ({
    files: state.files
})

export default connect(mapStateToProps, { getSharedFile, downloadSharedFile })(SharedFileView);