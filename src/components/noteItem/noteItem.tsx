import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import React, {
  useCallback,
  useState,
} from "react";

import { useAppSelector } from "../../store/hooks";
import { selectAll } from "../../store/modules/notesSlice";

interface NoteItemProps {
  note: any;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
}) => {
  const [openEdit, setOpenEdit] =
    useState<boolean>(false);
  const userLogged: any = useAppSelector(
    (state) => state.login
  );
  const listNotes = useAppSelector(selectAll);

  const [editTitle, setTitle] =
    useState<string>("");
  const [editDescription, setDescription] =
    useState<string>("");

  const handleDeleteNote = useCallback(
    (note: any) => {
      // const deleted = confirm(
      //   "Deseja deletar essa nota?"
      // );
      // if (deleted) {
      // dispatch(deleteNote(note.id));
      alert("Nota apagada!");
      // }
    },
    []
  );

  const openEditModal = useCallback(
    (note: any) => {
      setOpenEdit(true);
      setTitle(note.title);
      setDescription(note.description);
    },
    []
  );

  const handleEditNote = () => {
    if (!editTitle || editTitle.length < 3) {
      alert(
        "Detalhe inválido! \nPreencha com pelo menos 3 caractéres"
      );
      return;
    }
    if (
      !editDescription ||
      editDescription.length < 3
    ) {
      alert(
        "Descrição inválida! \nPreencha com pelo menos 3 caractéres"
      );
      return;
    }
    // dispatch(
    //   updateNote({
    //     id: note.id,
    //     changes: {
    //       title: editTitle,
    //       description: editDescription,
    //     },
    //   })
    // );
    alert("Nota editada!");
    setOpenEdit(false);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton
              onClick={() => openEditModal(note)}
              edge="end"
              aria-label="edit"
              sx={{ paddingRight: "20px" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                handleDeleteNote(note)
              }
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => handleEditNote()}
              edge="end"
              aria-label="archived"
            >
              <ArchiveIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText
          primary={note._title}
          secondary={note._description}
        />
      </ListItem>
      <Divider variant="inset" />
      <Dialog
        open={openEdit}
        onClose={handleClose}
      >
        <DialogTitle>
          Edite seu recado!
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="detalhe"
            label="Detalhe"
            type="text"
            value={editTitle || ""}
            onChange={(ev) =>
              setTitle(ev.target.value)
            }
            inputProps={{ maxLength: 200 }}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            type="text"
            value={editDescription || ""}
            onChange={(ev) =>
              setDescription(ev.target.value)
            }
            inputProps={{ maxLength: 300 }}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleEditNote()}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteItem;
