import {
  Card,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Note {
  id: number;
  title: string;
  content: string;
  user_id: number;
  version: number;
}

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit }) => {
  return (
    <Card
      sx={{
        width: 350,
        marginBottom: 3,
        position: "relative",
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Accordion sx={{ boxShadow: "none", borderTop: "1px solid #ddd" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#f7f7f7",
            borderBottom: "1px solid #ddd",
            padding: "10px 20px",
            "& .MuiAccordionSummary-content": {
              margin: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            {note.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              opacity: 10,
              transition: "opacity 0.3s ease-in-out",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <IconButton
              onClick={() => onDelete(note.id)}
              sx={{
                backgroundColor: "#FF4C4C",
                color: "white",
                "&:hover": { backgroundColor: "#FF0000" },
                borderRadius: "50%",
                padding: "6px",
                fontSize: "1.2rem",
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => onEdit(note.id)}
              sx={{
                backgroundColor: "#4CAF50",
                color: "white",
                "&:hover": { backgroundColor: "#388E3C" },
                borderRadius: "50%",
                padding: "6px",
                fontSize: "1.2rem",
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            backgroundColor: "#fafafa",
            padding: "20px",
            color: "#333",
            fontSize: "0.95rem",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Typography>{note.content}</Typography>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default NoteCard;
