import { Heart, Trophy, Users } from "lucide-react";
import { BgIcon } from "../ui/BgIcon";

export function WhyParticipate() {
	return (
		<div className='mt-8 px-section-x'>
			<h2 className='text-dark-text font-bold text-3xl text-center'>De ce să participi?</h2>
			<p className='text-light-text font-normal text-base mt-1 text-center'>
				Evenimentele din campus oferă mai mult decât distracție - sunt oportunități de dezvoltare,
				învățare și conectare.
			</p>

            <div className="grid sm:grid-cols-3 grid-cols-1 mt-3 gap-2">
                <div className="flex flex-col items-center">
                    <BgIcon 
                        icon={Users}
                        iconColor="dark-blue"
                        bgColor="dark-blue"
                        bgOpacity={10}
                        iconSize={2.5}
                        className="p-1.25 rounded-2xl"
                    />
                    <h3 className="text-dark-text font-bold text-2xl text-center mt-1.5">Conectare cu alți studenți</h3>
                    <p className="text-light-text font-normal text-base mt-0.5 text-center">
                        Participarea la evenimente îți oferă șansa de a întâlni și interacționa cu alți studenți care împărtășesc aceleași interese.
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <BgIcon 
                        icon={Trophy}
                        iconColor="dark-blue"
                        bgColor="dark-blue"
                        bgOpacity={10}
                        iconSize={2.5}
                        className="p-1.25 rounded-2xl"
                    />
                    <h3 className="text-dark-text font-bold text-2xl text-center mt-1.5">Obținerea de recunoaștere</h3>
                    <p className="text-light-text font-normal text-base mt-0.5 text-center">
                        Participarea la evenimente poate aduce recunoaștere pentru realizările tale și poate fi un plus valoros în CV-ul tău.
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <BgIcon 
                        icon={Heart}
                        iconColor="dark-blue"
                        bgColor="dark-blue"
                        bgOpacity={10}
                        iconSize={2.5}
                        className="p-1.25 rounded-2xl"
                    />
                    <h3 className="text-dark-text font-bold text-2xl text-center mt-1.5">Binele comunității</h3>
                    <p className="text-light-text font-normal text-base mt-0.5 text-center">
                        Participând la evenimente, contribui la crearea unei comunități studențești mai puternice și mai unite.
                    </p>
                </div>
            </div>
		</div>
	)
}
