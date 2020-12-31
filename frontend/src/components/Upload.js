import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import SimpleAlert from './SimpleAlert';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function Upload({alert, setAlert}) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps,isDragActive,isDragAccept,isDragReject} = useDropzone({
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div>
        <p>{file.name}</p>
        <div style={thumb} key={file.name}>
        <div style={thumbInner}>
            <img
            src={file.preview}
            style={img}
            alt={file.name}
            />
        </div>
        </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleSubmit = async (event) => {
    try {     
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", files[0]);
        await axios.post('/api/file/upload', formData, {
            headers : {"content-type" : "multipart/form-data"}
        });
        setAlert("File Uploaded Successfully.", "success");
        setFiles([]);
    }
    catch(error) {
        setAlert("Upload Failed. Try Again.", "error");
    }
  }

  return (
    <section className="container">
        <Container maxWidth="sm">
            {
                alert && <SimpleAlert msg={alert.msg} severity={alert.severity} />
            }
            <form onSubmit={handleSubmit}>
                <div {...getRootProps({className: 'dropzone', style})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
                { files.length > 0 && <Button variant="contained" color="primary" type="submit">Upload</Button> }
            </form>
        </Container>
    </section>
  );
}

const mapStateToProps = (state) => ({
    alert : state.alert
})

export default connect(mapStateToProps, {setAlert})(Upload);