import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { getAllFiles, downloadFile, deleteFile } from '../actions/file';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

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

const DashboardView = ({files, getAllFiles, downloadFile, deleteFile}) => {
  
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [sharableLink, setSharableLink] = useState();

  useEffect(() => {
    getAllFiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Your sharable link is below</h2>
      <p id="simple-modal-description">
        <a href={sharableLink} alt="sharedLink">{sharableLink}</a>
      </p>
    </div>
  );

  const downloadHandler = (id, filename) => {
    downloadFile(id, filename);
  }

  const shareFileHandler = (id) => {
    setSharableLink(`https://iadityashukla.com/shared/${id}`);
  }
 
  const deleteHandler = (id) => {
    deleteFile(id);
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
            <TableCell align="center">Delete</TableCell>
            <TableCell align="center">Share</TableCell>
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
                        <TableCell align="center">{`${Math.round(file.length/1024)} Kb`}</TableCell>
                        <TableCell align="center">{file.contentType}</TableCell>
                        <TableCell align="center">{new Date(file.uploadDate).toLocaleString()}</TableCell>
                        <TableCell align="center">
                            <Button variant="contained" color="primary" onClick={() => {
                                downloadHandler(file._id, file.filename)
                            }}>
                                Download
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button variant="contained" color="primary" onClick={() => {
                                deleteHandler(file._id)
                            }}>
                                Delete
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button variant="contained" color="primary" onClick={() => {
                                shareFileHandler(file._id);
                                handleOpen();
                              }}>
                                Share
                            </Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="simple-modal-title"
                              aria-describedby="simple-modal-description"
                            >
                              {modalBody}
                            </Modal>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            )
        }
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => ({
    files : state.files
})
export default connect(mapStateToProps, {getAllFiles, downloadFile, deleteFile})(DashboardView);