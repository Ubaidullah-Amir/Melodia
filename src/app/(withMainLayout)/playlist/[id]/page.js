"use client"
function SpecificPlaylist({params}) {
      const {id:playlistId} = params

      return (
            <div>
                  <p className="text-center ">playlist :{playlistId}</p>
            </div>
      );
};

export default SpecificPlaylist;