import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

// Custom component
import RuleDefinition from './ruleDefintion';
import '../RulePage/rulePage.css';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    }),
);

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

function RulePage() {
    const classes = useStyles();

    return (
        <React.Fragment>

            <Container>
                <CssBaseline />

                <Container fixed>
                    <h3>How to Play This Game</h3>
                    <Typography className="parentTypography" component="div">
                       <Container fixed>
                           <br/>
                       <Typography className="childTypography" component="div">
                           Introduction 
                           <br/>
                           <RuleDefinition />
                        </Typography>

                       </Container>
                        <ThemeProvider theme={theme}>
                            <Link to="/game-view">
                                <Button variant="contained" color="primary" className={classes.margin}>
                                    Proceed to Game
                                </Button>
                            </Link>
                        </ThemeProvider>
                    </Typography>
                </Container>
            </Container>

        </React.Fragment>
    )
}

export default RulePage;