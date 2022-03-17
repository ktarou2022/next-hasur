import { VFC } from 'react'
import Link from 'next/link'
import {  useQuery, gql } from '@apollo/client'
import {  GET_USERS, } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

function FetchMain ()  {
  console.log(GET_USERS)
  const { loading, error, data  } = useQuery(GET_USERS)
  if (error)
    return (
      <Layout title='Hasura fetchPolicy'>
        <p>Error: {error.message}</p>
      </Layout>
    )

  return (
    <Layout title='Hasura fetchPolicy'>
      <p className='mb-6 font-bold'>Hasura main page</p>
      {console.log(data)}
      {data?.users.map((user) => {
        return (
          <p className='my-1' key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className='mt-6'>Next</a>
      </Link>
    </Layout>
  )
}

export default FetchMain
