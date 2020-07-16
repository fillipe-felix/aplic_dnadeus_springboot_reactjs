package com.example.app;

import com.example.app.domain.Evento;
import com.example.app.domain.Membro;
import com.example.app.domain.Ministerio;
import com.example.app.repositories.EventoRepository;
import com.example.app.repositories.MembroRepository;
import com.example.app.repositories.MinisterioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;

@SpringBootApplication
public class AppApplication implements CommandLineRunner {

    @Autowired
    private MembroRepository membroRepository;
    @Autowired
    private MinisterioRepository ministerioRepository;
    @Autowired
    private EventoRepository eventoRepository;

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {

        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        //sdf.setTimeZone(TimeZone.getTimeZone("GMT"));

        Ministerio ministerio1 = new Ministerio(null, "Louvor1");
        Ministerio ministerio2 = new Ministerio(null, "Louvor2");
        Ministerio ministerio3 = new Ministerio(null, "Louvor3");

        Membro membro1 = new Membro(null, "Joao", "joao@gmail.com", 26, "23333121");
        Membro membro2 = new Membro(null, "Bruno", "bruno@gmail.com", 54, "131232");
        Membro membro3 = new Membro(null, "Felipe", "felipe@gmail.com", 32, "532323");

        Evento eventos1 = new Evento(null, "festa1", "festa de louvor", "342342",
                "rua josefina", 12312, "jd camaleao", "12/01/2018", "12:00", ministerio1);

        Evento eventos2 = new Evento(null, "festa2", "festa de louvor", "342342",
                "rua josefina", 12312, "jd camaleao", "12/05/2018", "12:00", ministerio1);

        Evento evento3 = new Evento(null, "festa1", "festa de louvor", "342342",
                "rua josefina", 12312, "jd camaleao", "12/03/2018", "12:00", ministerio2);

        Evento eventos4 = new Evento(null, "festa1", "festa de louvor", "342342",
                "rua josefina", 12312, "jd camaleao", "12/02/2018", "12:00", ministerio3);

        membroRepository.saveAll(Arrays.asList(membro1, membro2, membro3));
        ministerioRepository.saveAll(Arrays.asList(ministerio1, ministerio2, ministerio3));
        eventoRepository.saveAll(Arrays.asList(eventos1, eventos2, evento3, eventos4));


        ministerio1.getMembros().addAll(Arrays.asList(membro1, membro2));
        ministerio2.getMembros().addAll(Arrays.asList(membro1, membro2, membro3));
        ministerio3.getMembros().addAll(Arrays.asList(membro3));

        /*ministerio1.getEventos().addAll((Arrays.asList(eventos1, eventos2)));
        ministerio2.getEventos().addAll((Arrays.asList(evento3)));
        ministerio3.getEventos().addAll((Arrays.asList(eventos4)));*/


        membro1.getMinisterios().addAll(Arrays.asList(ministerio1, ministerio2));
        membro2.getMinisterios().addAll(Arrays.asList(ministerio3, ministerio2));
        membro3.getMinisterios().addAll(Arrays.asList(ministerio3));


        membroRepository.saveAll(Arrays.asList(membro1, membro2, membro3));
        ministerioRepository.saveAll(Arrays.asList(ministerio1, ministerio2, ministerio3));


    }
}
