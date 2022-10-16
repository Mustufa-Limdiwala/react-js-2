import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaulProps = {
        country: "in",
        pageSize: 6,
        category: "general",
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        };
        document.title = `${this.capitalizeFirstLetter(
            this.props.category
        )} - Monkey`;
    }
    async updateNews() {
        this.props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    };
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    };

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=29ed754924714bd4b7b3914eec76f71a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false,
        });
    };

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">
                    News Monkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
                    headlines
                </h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return (
                                    <div key={element.url} className="col-md-4">
                                        <Newsitem
                                            title={element.title ? element.title.slice(0, 45) : ""}
                                            description={
                                                element.description
                                                    ? element.description.slice(0, 88)
                                                    : ""
                                            }
                                            imageurl={element.urlToImage}
                                            newsurl={element.url}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default News;
