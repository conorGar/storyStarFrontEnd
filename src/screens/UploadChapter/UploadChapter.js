import React from 'react'
import { apiCall } from '../../services/apiService'
import S3FileUpload from 'react-s3';
import { AwsConfig } from '../../services/AwsConfig'
import Dropzone from 'react-dropzone'

import './UploadChapter.css'

class UploadChapter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            contents: [],
            filesToUpload: [],
            iconImgUrl: ''

        }
    }
    handlePagesUpload = async (evt) => {
        const { filesToUpload } = this.state

        const allFiles = evt.target.files
        for (let i = 0; i < allFiles.length; i++) {
            let value = allFiles[i].name
            let file = allFiles[i]
            this.setState(prevState => ({
                // contents: [...prevState.contents, value],
                filesToUpload: [...prevState.filesToUpload, file]
            }))
            await S3FileUpload.uploadFile(file, AwsConfig)
                .then((data) => {
                    console.log(data.location)
                    this.setState(prevState => ({
                        contents: [...prevState.contents, data.location],
                    }))
                    // console.log("uploaded file to AWS BUCKET" + filesToUpload[0])
                }).catch((err) => {
                    alert(err);
                })
        }




    }

    handleIconImageUpload = async (evt) => {
        console.log("Icon image upoad activate")
        console.log(evt)
        await S3FileUpload.uploadFile(evt[0], AwsConfig)
            .then((data) => {
                this.setState({
                    iconImgUrl: data.location
                })
            }).catch((err) => {
                alert(err);
            })
    }

    handleProjectSubmit = async (e) => {
        e.preventDefault();
        const { name, filesToUpload, contents, iconImgUrl } = this.state
        const id = this.props.match.params.id;
        console.log("Handle project submit activate")
        try {
            console.log(filesToUpload);
            console.log(filesToUpload[0].name);


            await apiCall.post(`chapter/create/story/${id}`, { name, contents, iconImgUrl })
            await this.props.history.push('/')



            console.log(contents)

            console.log("GOT HERE")


        }
        catch (error) {
            throw error
        }
        // }finally{
        //     console.log("Finally runs")
        //     await apiCall.post(`chapter/create/story/${id}`, { name, contents })

        // }
        // }finally{
        //     await this.props.history.push(`/story/${id}`)

        // }
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
                <h1>Upload New Chapter</h1>
                <div className="form-container">
                    <form className="project-submit-form" onSubmit={this.handleProjectSubmit}>
                      
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
                            <Dropzone onDrop={this.handleIconImageUpload} >
                                {({ getRootProps, getInputProps }) => (
                                    <section className='dropzone-section'>
                                        <h2>Chapter Icon:</h2>
                                        <h5 className='subtitle'>Recommended Size: 64x64</h5>

                                        <div {...getRootProps()} className='icon-drop-zone'>
                                            <input {...getInputProps()} />
                                            <p>Drag 'n' drop file here, or click to select file</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>


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



                        </div>
                        <button className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UploadChapter;