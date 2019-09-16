import React from 'react'
import { apiCall } from '../../services/apiService'
import S3FileUpload from 'react-s3';
import { AwsConfig } from '../../services/AwsConfig'

import './UploadStory.css'

class UploadStory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: '',
            name: '',
            description: '',
            imgUrl: '',
            username: ''
        }
    }
    handleImageUpload = async (evt) => {


        await S3FileUpload.uploadFile(evt.target.files[0], AwsConfig)
            .then((data) => {
                this.setState({
                    imgUrl: data.location
                })
                console.log("Upload success at:" + data.location);
            }).catch((err) => {
                alert(err);
            })
    }

    handleProjectSubmit = async (e) => {
        e.preventDefault();
        const { name, description, username, imgUrl } = this.state
        const id = this.props.match.params.id;
        console.log("Handle project submit activate")
        try {
            await apiCall.post(`story/create/user/${id}`, { name, description, imgUrl, username })
            await this.props.history.push('/')
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
                <h1>Upload New Story</h1>
                <div className="form-container">
                    <form className="project-submit-form" onSubmit={this.handleProjectSubmit}>
                        <div className="upload-image-container">
                            <h2>Drag Image Here</h2>
                            <input
                                name="uploadedImage"
                                type="file"
                                onChange={this.handleImageUpload}
                            />
                        </div>
                        <div className="text-info-container">
                            <div className="input-title-container">
                                <h2>Story Title:</h2>
                                <input
                                    type='text'
                                    name='name'
                                    onChange={this.handleTextInput}
                                    className="title-input-form"
                                    value={this.state.name}
                                />
                            </div>
                            <div className="input-description-container">
                                <h2>Description:</h2>
                                <textarea
                                    type='text'
                                    name='description'
                                    className='description-input'
                                    onChange={this.handleTextInput}
                                    value={this.state.description}
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

export default UploadStory;