export default function CulturePage() {
  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem'}}>
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem'}}>
            West African Culture Hub
          </h1>
          <p style={{fontSize: '1.25rem', color: '#6b7280', maxWidth: '768px', margin: '0 auto'}}>
            Discover the rich cultural heritage, languages, and traditions of West Africa
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem'}}>
          <div style={{backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '1.5rem'}}>
            <div style={{width: '3rem', height: '3rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'}}>
              📚
            </div>
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem'}}>Languages</h3>
            <p style={{color: '#6b7280'}}>
              Explore the diverse languages spoken across West Africa, from Hausa to Yoruba, Igbo to Wolof.
            </p>
          </div>

          <div style={{backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '1.5rem'}}>
            <div style={{width: '3rem', height: '3rem', backgroundColor: '#dcfce7', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'}}>
              🎭
            </div>
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem'}}>Traditions</h3>
            <p style={{color: '#6b7280'}}>
              Learn about traditional ceremonies, festivals, and cultural practices that define West African communities.
            </p>
          </div>

          <div style={{backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '1.5rem'}}>
            <div style={{width: '3rem', height: '3rem', backgroundColor: '#f3e8ff', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'}}>
              📜
            </div>
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem'}}>History</h3>
            <p style={{color: '#6b7280'}}>
              Discover the rich historical context and heritage of West African civilizations and kingdoms.
            </p>
          </div>
        </div>

        <div style={{backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '2rem', marginBottom: '3rem'}}>
          <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem', textAlign: 'center'}}>
            Featured Cultural Insights
          </h2>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem'}}>Popular Languages</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem'}}>
                  <span style={{fontWeight: '500'}}>Hausa</span>
                  <span style={{fontSize: '0.875rem', color: '#6b7280'}}>~50M speakers</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem'}}>
                  <span style={{fontWeight: '500'}}>Yoruba</span>
                  <span style={{fontSize: '0.875rem', color: '#6b7280'}}>~45M speakers</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem'}}>
                  <span style={{fontWeight: '500'}}>Igbo</span>
                  <span style={{fontSize: '0.875rem', color: '#6b7280'}}>~30M speakers</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem'}}>
                  <span style={{fontWeight: '500'}}>Wolof</span>
                  <span style={{fontSize: '0.875rem', color: '#6b7280'}}>~10M speakers</span>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem'}}>Cultural Festivals</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <div style={{padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem'}}>
                  <div style={{fontWeight: '500', color: '#1f2937'}}>Eid al-Fitr</div>
                  <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Islamic celebration across the region</div>
                </div>
                <div style={{padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem'}}>
                  <div style={{fontWeight: '500', color: '#1f2937'}}>Yam Festival</div>
                  <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Traditional harvest celebration</div>
                </div>
                <div style={{padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem'}}>
                  <div style={{fontWeight: '500', color: '#1f2937'}}>Carnival</div>
                  <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Colorful street celebrations</div>
                </div>
                <div style={{padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem'}}>
                  <div style={{fontWeight: '500', color: '#1f2937'}}>Durban Festival</div>
                  <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Cultural heritage celebration</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{textAlign: 'center'}}>
          <div style={{background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)', borderRadius: '1rem', padding: '2rem', color: 'white'}}>
            <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem'}}>Explore More</h2>
            <p style={{fontSize: '1.25rem', marginBottom: '1.5rem', opacity: 0.9}}>
              Dive deeper into West African culture and traditions
            </p>
            <button style={{backgroundColor: 'white', color: '#2563eb', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer'}}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
