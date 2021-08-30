import React, { useState } from 'react'
import Snippet from '../molecules/Snippet'
import Loader from '../atoms/Loader'
import {
  useFindSnippetsQuery,
  useGetSnippetsQuery
} from '../../services/snippets'
import SnippetListActions from './SnippetListActions'
import { useLocation } from 'react-router-dom'

const SnippetList = () => {
  const [searchTerm, setSearchTerm] = useState(null)
  const { data: snippets = [], error, isLoading } = useGetSnippetsQuery()
  const { data: foundSnippets } = useFindSnippetsQuery(searchTerm)
  console.log('useFindSnippetsQuery(searchTerm):', useFindSnippetsQuery(searchTerm))
  const snipeptsToRender = searchTerm ? foundSnippets : snippets
  
  
  const useQuery = ()=> {
    return new URLSearchParams(useLocation().search);
  }
  
  const query = useQuery()
  console.log('query:', query.get("page"))

  if (isLoading) return <Loader />
  if (error) return error.message

  return (
    <>
      <SnippetListActions onSearch={setSearchTerm} />
      <ul>
        {snipeptsToRender.map(snippet => (
          <Snippet key={snippet.id} snippet={snippet}></Snippet>
        ))}
      </ul>
    </>
  )
}

export default SnippetList
