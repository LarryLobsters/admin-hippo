import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiUserCircle } from 'react-icons/bi'
import { RiHome6Line } from 'react-icons/ri'
import { LiaHippoSolid } from 'react-icons/lia'
import UserButton from '../user-button'
import { Separator } from '../ui/separator'

function NavBar() {
	const router = useRouter()
	console.log(router.pathname)
	function pathMatchRoute(route: string): boolean {
		if (route === router.pathname) return true
		return false
	}
	return (
		<nav className='fixed bg-neutral-100 md:bg-neutral-800 h-20 rounded-t-xl z-[901] w-screen bottom-0 md:min-h-screen  md:w-[220px] transition-all duration-300'>
			<div className='h-14 w-full md:flex gap-2 items-center rounded justify-center hidden'>
				<span>
					<LiaHippoSolid size={24} className='text-white' />
				</span>{' '}
				<span className='text-gray-100'>Hippo Docs</span>
			</div>

			<Separator />
			<div className='md:flex w-full flex-col my-6 px-2 cursor-pointer hidden'>
				<UserButton />
			</div>

			<ul className='flex flex-row md:flex-col h-20 items-center md:justify-start md:my-16 justify-evenly md:space-y-8 w-full'>
				<li className=''>
					<Link
						href='/dashboard'
						className={`navbarLink ${
							pathMatchRoute('/dashboard')
								? 'text-violet-400 font-semibold underline'
								: 'text-gray-500 font-thin'
						}`}
					>
						<RiHome6Line
							className='hover:scale-125 focus:text-violet-400 transition-all ease-out duration-300'
							size={24}
						/>

						<span>Dashboard</span>
					</Link>
				</li>
				<li className=''>
					<Link
						href='/create-customer'
						className={`navbarLink ${
							pathMatchRoute('/create-customer')
								? 'text-violet-400 font-semibold underline'
								: 'text-gray-500 font-thin'
						}`}
					>
						<LiaHippoSolid
							className='hover:scale-125 focus:text-violet-400 transition-all ease-out duration-300'
							size={24}
						/>
						<span className='w-full'>Add Customer</span>
					</Link>
				</li>

				<li className=''>
					<Link
						href='/profile-customer'
						className={`navbarLink ${
							pathMatchRoute('/profile-customer')
								? 'text-violet-400 font-semibold underline'
								: 'text-gray-500 font-thin'
						}`}
					>
						<BiUserCircle
							className='hover:scale-125 focus:text-violet-400 transition-all ease-out duration-300'
							size={24}
						/>
						<span>Profile</span>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
