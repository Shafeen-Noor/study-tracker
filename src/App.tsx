import { useState } from "react";
import AddEntry from "./AddEntry";
import EntryList from "./EntryList";
import type { StudyEntry } from "./Logic";
import { Container, Typography , Box } from "@mui/material";

const App: React.FC = () => {
  const [entries, setEntries] = useState<StudyEntry[]>([]);

  const addEntry = (entry: StudyEntry) => {
    setEntries([...entries, entry]);
  };

return (
  <Container>
    <Box className="app-container">
      <Typography
        variant="h3"
        className="app-heading"
      >
        Study Tracker
      </Typography>
    </Box>

    <AddEntry addEntry={addEntry} />
    <EntryList entries={entries} />
  </Container>
);
};

export default App;