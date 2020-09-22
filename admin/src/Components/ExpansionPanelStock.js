import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Form } from 'react-bootstrap'

//components
import TableStock from './TableStock';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
    <div className={classes.root}>
      <div>
        <h6>Ajouter un nouveau stock </h6>
        <Form style={{marginBottom:'5%'}}>
          <Form.File 
            id="custom-file"
            label="cliquer pour inserer"
            custom
          />
        </Form>
      </div>
      <h6>Historique des stocks</h6>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Stock 4</Typography>
          <Typography className={classes.heading }>20/04/2020  15:42</Typography>
          <Typography style={{marginLeft:'10%'}} className={classes.heading}>Stock actuel</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TableStock/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Stock 3</Typography>
          <Typography className={classes.secondaryHeading}>
          20/04/2020  15:42
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <TableStock/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Stock 2</Typography>
          <Typography className={classes.secondaryHeading}>
          20/04/2020  15:42
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <TableStock/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Stock 1</Typography>
          <Typography className={classes.secondaryHeading }>20/04/2020  15:42</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <TableStock/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    </React.Fragment>
  );
}