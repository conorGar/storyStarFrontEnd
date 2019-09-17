import React from 'react'
import { apiCall } from '../../services/apiService'
import S3FileUpload from 'react-s3';
import { AwsConfig } from '../../services/AwsConfig'

import './UploadChapter.css'

class UploadChapter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'chapter2',
            contents: [],
            filesToUpload: []
        }
    }
    handlePagesUpload = async (evt) => {
        
      
        for(let i = 0 ; i < evt.target.files.length; i++){
            let value = evt.target.files[i].name
            let file =evt.target.files[i]
            this.setState(prevState => ({
                contents: [...prevState.contents, value],
                filesToUpload: [...prevState.filesToUpload,file]
            }))
        }


        // TODO: THIS WILL ONLY UPLOAD FIRST FILE TO AWS, NOT ALL OF THEM *****
        // console.log("HANDLE PAGES UPLOAD ACTIVATE")
        // console.log(this.state.contents);
        // await S3FileUpload.uploadFile(evt.target.files[0], AwsConfig)
        //     .then((data) => {
        //         console.log(data);

        //         this.setState({
        //             contents: data.contents
        //         })
        //     }).catch((err) => {
        //         alert(err);
        //     })
    }

    handleProjectSubmit = async (e) => {
        e.preventDefault();
        const { name, filesToUpload, contents } = this.state
        const id = this.props.match.params.id;
        console.log("Handle project submit activate")
        try {
            console.log(filesToUpload);
            console.log(filesToUpload[0].name);

            filesToUpload.forEach(async (file) => {
                    await S3FileUpload.uploadFile(file, AwsConfig)
                    .then((data) => {
                       
                        console.log("uploaded file to AWS BUCKET" + filesToUpload[0])
                    }).catch((err) => {
                        alert(err);
                    })
            })
              


            await apiCall.post(`chapter/create/story/${id}`, { name, contents })
            await this.props.history.push(`/story/${id}`)


        }
        catch (error) {
            throw error
        }
    }

    handleTextInput = async (evt) => {
        const { name, value } = evt.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="upload-project-container">
                <h1>Upload New Chapter 2</h1>
                <div className="form-container">
                    <form className="project-submit-form" onSubmit={this.handleProjectSubmit}>
                        <div className="upload-image-container">
                            <h2>Upload Pages Here</h2>
                            <h5>JPEG,PNG,GIF supported</h5>
                            <input
                                name="uploadedImage"
                                type="file"
                                onChange={this.handlePagesUpload}
                                multiple
                            />
                        </div>
                        <div className="text-info-container">
                            <div className="input-title-container">
                                <h2>Chapter Title:</h2>
                                <input
                                    type='text'
                                    name='name'
                                    onChange={this.handleTextInput}
                                    className="title-input-form"
                                    value={this.state.name}
                                />
                            </div>
                      
                        
                        </div>
                        <button className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UploadChapter;