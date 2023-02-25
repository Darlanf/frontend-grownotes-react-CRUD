import React, { useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  useThunkAppDispatch,
  useAppSelector,
} from "../store/hooks";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar/ResponsiveAppBar";
import NoteItem from "../components/noteItem/noteItem";
import NoteForm from "../components/noteForm/noteForm";
import {
  listNotesAction,
  selectAll,
} from "../store/modules/notesSlice";

const Home: React.FC = () => {
  const userLogged: any = useAppSelector(
    (state) => state.login
  );
  console.log("user:", userLogged);
  const listNotes = useAppSelector(selectAll);
  console.log("listNotes:", listNotes);
  const dispatch = useThunkAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged.logged) {
      alert(
        "Realize o login para acessar suas notas!"
      );
      navigate("/login");
    }
    dispatch(listNotesAction(userLogged.user.id));
  }, [userLogged, navigate, dispatch]);

  const handleLogOff = () => {
    // eslint-disable-next-line no-restricted-globals
    const logOut = confirm(
      "Deseja realmente sair?"
    );
    if (logOut) {
      userLogged.user = {};
      userLogged.logged = false;
      console.log("logout:", userLogged);
    }
    navigate("/login");
  };

  return (
    <>
      <ResponsiveAppBar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NoteForm />
        </Grid>
        {listNotes.length && (
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{ padding: "5px" }}
            >
              {listNotes.map((note: any) => {
                return (
                  <NoteItem
                    key={note._id}
                    note={note}
                  />
                );
              })}
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} display="flex">
          <Button
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={handleLogOff}
          >
            Sair
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
