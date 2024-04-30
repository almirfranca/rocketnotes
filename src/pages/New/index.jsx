import { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItem';
import { Button } from '../../components/Button';

import { Container, Form } from "./styles";

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink])
    setNewLink("")
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter( tag => tag !== deleted))
  }

  function handleBack() {
    navigate(-1)
}

  async function handleNewNote () {
    if(!title) {
      return alert("Título da nota obrigatório.")
    }

    if(newLink) {
      return alert("Você deixou um link preenchido, mas não clicou em adicionar. Clique em adicionar, ou limpe o campo.")
    }

    if(newTag) {
      return alert("Você deixou uma tag preenchida, mas não clicou em adicionar. Clique em adicionar, ou limpe o campo.")
    }



    await api.post("/notes", {
      title,
      description,
      links,
      tags
    });

    alert("Nota criada com sucesso!")
    navigate(-1)
  }

  return(
    <Container>
      <Header/>
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link onClick={handleBack}>Voltar</Link>
          </header>

          <Input 
            placeholder="Título" 
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder="Observações ..." 
            onChange={e => setDescription(e.target.value)}
          />
          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem key={String(index)} value={link} onClick={() => handleRemoveLink(link)}/>
              ))
            }
            <NoteItem $isnew placeholder="Novo link" value={newLink} onChange={e => setNewLink(e.target.value)} onClick={handleAddLink}/>
          </Section>
          
          <Section title="Marcadores">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                  <NoteItem key={String(index)} value={tag} onClick={() => handleRemoveTag(tag)}/>
                ))
              }
              <NoteItem $isnew placeholder="Novo marcador" value={newTag} onChange={e => setNewTag(e.target.value)} onClick={handleAddTag}/>
            </div>
          </Section>
          <Button title="Salvar" onClick={handleNewNote}/>
        </Form>
      </main>
    </Container>
  )
}