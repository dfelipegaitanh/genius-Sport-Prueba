import React, {Component} from "react";
import "./index.css";

const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      yearData: [],
      totalYearData: 0
    };
  }

  onClick = (year) => (e) => {

    fetch('https://jsonmock.hackerrank.com/api/football_competitions?year=' + year)
      .then(response => response.json())
      .then(data => {
        this.setState({
          selectedYear: year,
          yearData: data.data,
          totalYearData: data.data.length
        })
      })
      .catch(function (error) {
        // console.log(error)
      });

  }

  render() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
                  onClick={this.onClick(year)}
                  key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        <section className="content">


          {this.state.selectedYear !== null &&
          <section>
            <div>
              {this.state.totalYearData > 0 &&
              <div className="total-matches" data-testid="total-matches">
                Total matches: {this.state.totalYearData}
              </div>
              }
              {this.state.totalYearData ?
                <ul className="mr-20 matches styled" data-testid="match-list">
                  {this.state.yearData.map((data, i) => {
                    return (
                      <li className="slide-up-fade-in" key={i}>Match {data.name} won
                        by {data.winner}</li>
                    )
                  })}
                </ul>
                :
                <div data-testid="no-result" className="slide-up-fade-in no-result">No Matches
                  Found</div>
              }
            </div>
          </section>
          }

        </section>
      </div>
    );
  }
}
