import React from 'react'
import './ChapterPage.css'
import { apiCall } from '../../services/apiService'
import { Link } from 'react-router-dom'

class ChapterPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contents: []

        };
    }


    componentDidMount = () => {
        
        this.fetchChapterPages()

    }

     
    fetchChapterPages = async () => {
        let id = this.props.match.params.id
        const response = await apiCall.get(`chapter/story/${id}`)
      
        this.setState({
          name: response.data.name,
          contents: response.data.contents
        })
      }



    renderPages = () => {
        const { contents } = this.state
        console.log(this.state.contents )
        return contents.map(content => {
          return (
            <div key={content.id} className="content-page">
                <img alt="content page" src={content.content_link} />
            </div>
          )
        })
      }



    render(){
        return(
            <div className='chapter-page-contianer'>
                {this.renderPages()}
            </div>
        )
    }
}

export default ChapterPage;