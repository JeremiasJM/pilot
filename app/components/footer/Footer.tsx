import React from 'react'
import Container from "@/app/components/Container"
import FooterList from './FooterList'
import Link from 'next/link'
import { MdFacebook } from 'react-icons/md'
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai'





export default function Footer() {
  return (
    <footer className='bg-slate-700 text-slate-200 text-sm mt-16'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between pt-16 pb-6'>
        <FooterList>
            <h3 className='text-base font-bold mb-2'>Pilot Categorias</h3>
            <Link  href='#'>Phone</Link>
            <Link href='#'>Laptops</Link>
            <Link href='#'>Desktop</Link>
            <Link href='#'>Watches</Link>
            <Link href='#'>Tvs</Link>
            <Link href='#'>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Custom Service</h3>
            <Link href='#'>Contac</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Returns & Exchanges</Link>
            <Link href='#'>FAQs</Link>
          </FooterList>
          <div className='w-full md:w-1/3 mb-6 md:mb-0'>
            <h3 className='text-base font-bold'>About Us</h3>
            <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            <p>&copy; {new Date().getFullYear()} Pilot-endoscopy. All rights reserved </p>
          </div>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Follow Us</h3>
            <div className='flex gap-2'>
              <Link href='#'>
                <MdFacebook size={24}/>
              </Link>
              <Link href='#'>
                <AiFillTwitterCircle size={24}/>
              </Link>
              <Link href='#'>
                <AiFillYoutube size={24}/>
              </Link>
              <Link href='#'>
                <AiFillInstagram size={24}/>
              </Link>

            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  )
}
