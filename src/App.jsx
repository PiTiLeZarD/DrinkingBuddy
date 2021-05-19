import { useState } from "react";
import ReactDOM from "react-dom";

import { Paper, Grid, TextField, FormControl, InputLabel, Select, MenuItem, LinearProgress } from "@material-ui/core";
import { Person, Alcohol, Drink } from "./lib";
import { DateTime } from "luxon";

const App = (props) => {
    const [height, setHeight] = useState("183");
    const [weight, setWeight] = useState("82");
    const [gender, setGender] = useState("male");

    const person = new Person(gender, height, weight);

    const [volume, setVolume] = useState(500);
    const [percentage, setPercentage] = useState(5.32);
    const [standardDrinks, setStandardDrinks] = useState(2.1);

    const alcohol1 = Alcohol.fromPercentageAndVolume(percentage, volume);
    const alcohol2 = Alcohol.fromStandardDrink(standardDrinks);

    const start_date = DateTime.local();
    const drink = new Drink(start_date, 60 * 30, alcohol2);
    const alcohol_data = new Array(181)
        .fill()
        .map((_, m) => drink.getAlcoholContentForDate(person, start_date.plus({ minutes: m })));
    const max_alcohol = Math.max(...alcohol_data);

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper style={{ textAlign: "center", padding: "2em" }}>
                    <TextField
                        id="height"
                        label="Height (in cm)"
                        style={{ width: "100%" }}
                        value={height}
                        onChange={(ev) => setHeight(ev.target.value)}
                    />
                    <br />
                    <TextField
                        id="weight"
                        label="Weight (in kg)"
                        style={{ width: "100%" }}
                        value={weight}
                        onChange={(ev) => setWeight(ev.target.value)}
                    />
                    <br />
                    <FormControl style={{ width: "100%" }}>
                        <InputLabel>Gender</InputLabel>
                        <Select value={gender} onChange={(ev) => setGender(ev.target.value)}>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>
                <Paper style={{ textAlign: "center", padding: "2em" }}>
                    <h2>BMI:</h2>
                    <pre>{person.getBMI()}</pre>
                    <hr />
                    <h2>Blood Volume:</h2>
                    <dl style={{ textAlign: "left" }}>
                        <dt>Nadler</dt>
                        <dd>{person.getNadlerBloodVolume()} ml</dd>

                        <dt>Lemmens-Bernstein-Brodsky</dt>
                        <dd>{person.getLemmensBernsteinBrodskyBloodVolume()} ml</dd>

                        <dt>Weight</dt>
                        <dd>{person.getWeightBasedBloodVolume()} ml</dd>

                        <dt>Average</dt>
                        <dd>{person.getBloodVolume()} ml</dd>
                    </dl>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper style={{ textAlign: "center", padding: "2em" }}>
                    <h2>Alcohol1:</h2>
                    <p>(volume, %age)</p>
                    <TextField
                        id="volume"
                        label="Volume (in ml)"
                        style={{ width: "100%" }}
                        value={volume}
                        onChange={(ev) => setVolume(ev.target.value)}
                    />
                    <br />
                    <TextField
                        id="percentage"
                        label="Percentage of Alcohol"
                        style={{ width: "100%" }}
                        value={percentage}
                        onChange={(ev) => setPercentage(ev.target.value)}
                    />
                    <br />
                    <h3>{alcohol1.content} mg</h3>
                    <h4>BAC: {person.getBACInGramPct(alcohol1)} gr/100ml</h4>
                    <hr />
                    <h2>Alcohol2:</h2>
                    <p>(standard drinks)</p>
                    <TextField
                        id="standardDrinks"
                        label="Standard Drinks"
                        style={{ width: "100%" }}
                        value={standardDrinks}
                        onChange={(ev) => setStandardDrinks(ev.target.value)}
                    />
                    <br />
                    <h3>{alcohol2.content} mg</h3>
                    <h4>BAC: {person.getBACInGramPct(alcohol2)} gr/100ml</h4>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper style={{ textAlign: "center", padding: "2em" }}>
                    <h2>BAC over time</h2>
                    <p>For alcohol2</p>
                    {alcohol_data.map((v, i) => (
                        <Grid container key={i} style={{ height: "1em" }}>
                            <Grid item xs={1}>
                                {i % 5 === 0 && <span>{i}mn</span>}
                            </Grid>
                            <Grid item xs={11}>
                                <LinearProgress
                                    variant="determinate"
                                    value={(v / max_alcohol) * 100}
                                    style={{ height: "1em" }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Paper>
            </Grid>
        </Grid>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
