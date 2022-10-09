import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    render() {
        return (
            <div className='container my-3'>
                <h2>News MOnkey Top headlines</h2>
                <div className='row'>
                    <div className="col-md-4">
                        <Newsitem title="My Title" description="mydesc" />
                    </div>
                    <div className="col-md-4">
                        <Newsitem title="My Title" description="mydesc" />
                    </div>
                    <div className="col-md-4">
                        <Newsitem title="My Title" description="mydesc" />
                    </div>
                </div>
            </div>
        )
    }
}

export default News
