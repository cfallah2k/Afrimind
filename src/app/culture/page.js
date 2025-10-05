export default function CulturePage() {
  return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);">
      <div style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h1 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
            West African Culture Hub
          </h1>
          <p style="font-size: 1.25rem; color: #6b7280; max-width: 768px; margin: 0 auto;">
            Discover the rich cultural heritage, languages, and traditions of West Africa
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
          <div style="background-color: white; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 1.5rem;">
            <div style="width: 3rem; height: 3rem; background-color: #dbeafe; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
              📚
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Languages</h3>
            <p style="color: #6b7280;">
              Explore the diverse languages spoken across West Africa, from Hausa to Yoruba, Igbo to Wolof.
            </p>
          </div>

          <div style="background-color: white; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 1.5rem;">
            <div style="width: 3rem; height: 3rem; background-color: #dcfce7; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
              🎭
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Traditions</h3>
            <p style="color: #6b7280;">
              Learn about traditional ceremonies, festivals, and cultural practices that define West African communities.
            </p>
          </div>

          <div style="background-color: white; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 1.5rem;">
            <div style="width: 3rem; height: 3rem; background-color: #f3e8ff; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
              📜
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">History</h3>
            <p style="color: #6b7280;">
              Discover the rich historical context and heritage of West African civilizations and kingdoms.
            </p>
          </div>
        </div>

        <div style="background-color: white; border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); padding: 2rem; margin-bottom: 3rem;">
          <h2 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; margin-bottom: 1.5rem; text-align: center;">
            Featured Cultural Insights
          </h2>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">Popular Languages</h3>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
                  <span style="font-weight: 500;">Hausa</span>
                  <span style="font-size: 0.875rem; color: #6b7280;">~50M speakers</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
                  <span style="font-weight: 500;">Yoruba</span>
                  <span style="font-size: 0.875rem; color: #6b7280;">~45M speakers</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
                  <span style="font-weight: 500;">Igbo</span>
                  <span style="font-size: 0.875rem; color: #6b7280;">~30M speakers</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
                  <span style="font-weight: 500;">Wolof</span>
                  <span style="font-size: 0.875rem; color: #6b7280;">~10M speakers</span>
                </div>
              </div>
            </div>

            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">Cultural Festivals</h3>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div style="padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
                  <div style="font-weight: 500; color: #1f2937;">Eid al-Fitr</div>
                  <div style="font-size: 0.875rem; color: #6b7280;">Islamic celebration across the region</div>
                </div>
                <div style="padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
                  <div style="font-weight: 500; color: #1f2937;">Yam Festival</div>
                  <div style="font-size: 0.875rem; color: #6b7280;">Traditional harvest celebration</div>
                </div>
                <div style="padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
                  <div style="font-weight: 500; color: #1f2937;">Carnival</div>
                  <div style="font-size: 0.875rem; color: #6b7280;">Colorful street celebrations</div>
                </div>
                <div style="padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
                  <div style="font-weight: 500; color: #1f2937;">Durban Festival</div>
                  <div style="font-size: 0.875rem; color: #6b7280;">Cultural heritage celebration</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align: center;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); border-radius: 1rem; padding: 2rem; color: white;">
            <h2 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">Explore More</h2>
            <p style="font-size: 1.25rem; margin-bottom: 1.5rem; opacity: 0.9;">
              Dive deeper into West African culture and traditions
            </p>
            <button style="background-color: white; color: #2563eb; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; border: none; cursor: pointer;">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
